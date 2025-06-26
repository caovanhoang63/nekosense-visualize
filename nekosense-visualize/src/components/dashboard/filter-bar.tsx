"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface FilterBarProps {
    selectedLocation: string
    setSelectedLocation: (location: string) => void
    selectedDevice: string
    setSelectedDevice: (device: string) => void
}

export function FilterBar({
                              selectedLocation,
                              setSelectedLocation,
                              selectedDevice,
                              setSelectedDevice,
                          }: FilterBarProps) {
    return (
        <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            <SelectItem value="vietnam">Vietnam</SelectItem>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia">Asia (Other)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Device / User Agent</label>
                    <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Devices</SelectItem>
                            <SelectItem value="desktop">Desktop</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="tablet">Tablet</SelectItem>
                            <SelectItem value="chrome">Chrome</SelectItem>
                            <SelectItem value="safari">Safari</SelectItem>
                            <SelectItem value="firefox">Firefox</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Page</label>
                    <Select defaultValue="homepage">
                        <SelectTrigger>
                            <SelectValue placeholder="Select page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="homepage">Homepage</SelectItem>
                            <SelectItem value="products">Products</SelectItem>
                            <SelectItem value="blog">Blog</SelectItem>
                            <SelectItem value="checkout">Checkout</SelectItem>
                            <SelectItem value="contact">Contact</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </Card>
    )
}
