// Hàm nâng cao hơn với clustering thông minh
import {HeatmapResponse} from "@/services/heatmap.api";
import {HeatmapDataDisplay} from "@/components/dashboard/heatmap-section";

export function convertToHeatmapWithClustering(trackingData: HeatmapResponse[], radius = 30, minPoints = 2) {
    const clusters: HeatmapDataDisplay[] = [];
    const processed = new Set();

    trackingData.forEach((point, index) => {
        if (processed.has(index)) return;

        // Tìm tất cả điểm trong bán kính
        const cluster = {
            points: [point],
            indices: [index]
        };

        for (let j = index + 1; j < trackingData.length; j++) {
            if (processed.has(j)) continue;

            const otherPoint = trackingData[j];
            const distance = Math.sqrt(
                Math.pow(point.x - otherPoint.x, 2) +
                Math.pow(point.y - otherPoint.y, 2)
            );

            if (distance <= radius) {
                cluster.points.push(otherPoint);
                cluster.indices.push(j);
            }
        }

        // Chỉ tạo cluster nếu có đủ điểm
        if (cluster.points.length >= minPoints) {
            // Tính tọa độ trung tâm
            const centerX = cluster.points.reduce((sum, p) => sum + p.x, 0) / cluster.points.length;
            const centerY = cluster.points.reduce((sum, p) => sum + p.y, 0) / cluster.points.length;

            clusters.push({
                x: Math.round(centerX),
                y: Math.round(centerY),
                value: cluster.points.length
            });

            // Đánh dấu các điểm đã xử lý
            cluster.indices.forEach(idx => processed.add(idx));
        }
    });

    // Thêm các điểm đơn lẻ với value = 1
    trackingData.forEach((point, index) => {
        if (!processed.has(index)) {
            clusters.push({
                x: point.x,
                y: point.y,
                value: 1
            });
        }
    });

    return clusters;
}

export function convertTrackingToHeatmap(trackingData: HeatmapResponse[], gridSize = 50) {
    const grid = new Map();

    // Gộp các điểm vào grid
    trackingData.forEach(point => {
        // Làm tròn tọa độ về grid
        const gridX = Math.floor(point.x / gridSize) * gridSize + gridSize / 2;
        const gridY = Math.floor(point.y / gridSize) * gridSize + gridSize / 2;

        const key = `${gridX},${gridY}`;

        if (grid.has(key)) {
            grid.set(key, grid.get(key) + 1);
        } else {
            grid.set(key, 1);
        }
    });

    // Chuyển đổi Map thành array
    const heatmapData: HeatmapDataDisplay[] = [];
    grid.forEach((value, key) => {
        const [x, y] = key.split(',').map(Number);
        heatmapData.push({x, y, value});
    });

    return heatmapData;
}

