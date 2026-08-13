"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Eye, EyeOff, KeyRound, Loader2, User } from "lucide-react";
import { toast } from "sonner"; // or your preferred toast library

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateVendorMutation } from "@/store/api/slices/admin-vendor-api";

export default function AddVendorPage() {
    const router = useRouter();
    const [createVendor, { isLoading }] = useCreateVendorMutation();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        businessName: "",
        ownerName: "",
        tradeLicenseNumber: "",
        tinNumber: "",
        binNumber: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Auto-fill ownerName from firstName & lastName if left empty
            const payload = {
                ...formData,
                ownerName: formData.ownerName.trim() || `${formData.firstName} ${formData.lastName}`.trim(),
            };

            const result = await createVendor(payload).unwrap();

            toast.success(`Vendor "${result.vendor.businessName}" created successfully!`);
            // Navigate to vendors list or request approval page
            router.push("/dashboard/admin/vendors");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create vendor. Please try again.");
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            {/* Header Bar */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/dashboard/admin/vendors"
                            className="text-xs text-muted-foreground hover:underline"
                        >
                            Vendors
                        </Link>
                        <span className="text-xs text-muted-foreground">/</span>
                        <span className="text-xs font-medium">Add New</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Create New Vendor</h1>
                    <p className="text-sm text-muted-foreground">
                        Register a new vendor and assign their administrative account credentials.
                    </p>
                </div>
                <Button variant="outline" size="sm">
                    <Link href="/dashboard/admin/vendors">
                        <ArrowLeft className="mr-2 size-4" /> Back
                    </Link>
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Account Credentials */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="size-5 text-primary" />
                            <CardTitle className="text-lg">Account & Contact Information</CardTitle>
                        </div>
                        <CardDescription>
                            These details will be used to create the user account for accessing the vendor portal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="Tanvir"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Rahman"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tanvir.vendor@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="+8801712345678"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-span-1 space-y-2 sm:col-span-2">
                            <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Minimum 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="size-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Business & Legal Credentials */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Building2 className="size-5 text-primary" />
                            <CardTitle className="text-lg">Business & Legal Information</CardTitle>
                        </div>
                        <CardDescription>
                            Provide official business registration details for verification.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="businessName">Business Name <span className="text-destructive">*</span></Label>
                            <Input
                                id="businessName"
                                name="businessName"
                                placeholder="Grand Gourmet Kitchen"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ownerName">Owner Full Name (Optional)</Label>
                            <Input
                                id="ownerName"
                                name="ownerName"
                                placeholder="Tanvir Rahman (Defaults to First + Last Name)"
                                value={formData.ownerName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tradeLicenseNumber">Trade License Number</Label>
                            <Input
                                id="tradeLicenseNumber"
                                name="tradeLicenseNumber"
                                placeholder="e.g. TL-8839201"
                                value={formData.tradeLicenseNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tinNumber">TIN Number</Label>
                            <Input
                                id="tinNumber"
                                name="tinNumber"
                                placeholder="e.g. TIN-4820193"
                                value={formData.tinNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-span-1 space-y-2 sm:col-span-2">
                            <Label htmlFor="binNumber">BIN Number</Label>
                            <Input
                                id="binNumber"
                                name="binNumber"
                                placeholder="e.g. BIN-1930284"
                                value={formData.binNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-4">
                    <Button variant="outline" type="button" disabled={isLoading}>
                        <Link href="/dashboard/admin/vendors">Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Create Vendor
                    </Button>
                </div>
            </form>
        </div>
    );
}