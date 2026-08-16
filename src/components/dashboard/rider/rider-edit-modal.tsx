"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Rider, useUpdateRiderMutation } from "@/store/api/slices/rider-api";

interface EditModalProps {
    rider: Rider;
    isOpen: boolean;
    onClose: () => void;
}

export function EditRiderProfileModal({
    rider,
    isOpen,
    onClose,
}: EditModalProps) {
    const [updateRider, { isLoading }] = useUpdateRiderMutation();

    const [formData, setFormData] = useState({
        firstName: rider.firstName || "",
        lastName: rider.lastName || "",
        phone: rider.phone || "",
        emergencyName: rider.emergencyName || "",
        emergencyPhone: rider.emergencyPhone || "",
        emergencyRelation: rider.emergencyRelation || "",
        workZoneDivision: rider.workZoneDivision || "",
        workZoneDistrict: rider.workZoneDistrict || "",
        workZone: rider.workZone || "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateRider({
                riderCode: rider.riderCode,
                ...formData,
            }).unwrap();
            onClose();
        } catch (err) {
            console.error("Failed to update rider profile:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-border pb-4">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                        Edit Profile
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-muted-foreground">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-muted-foreground">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                            className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-muted-foreground">
                            Work Zone
                        </label>
                        <input
                            type="text"
                            value={formData.workZone}
                            onChange={(e) =>
                                setFormData({ ...formData, workZone: e.target.value })
                            }
                            className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="border-t border-border pt-3">
                        <p className="mb-2 text-xs font-semibold text-muted-foreground">
                            Emergency Contact
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                placeholder="Name"
                                value={formData.emergencyName}
                                onChange={(e) =>
                                    setFormData({ ...formData, emergencyName: e.target.value })
                                }
                                className="w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <input
                                placeholder="Phone"
                                value={formData.emergencyPhone}
                                onChange={(e) =>
                                    setFormData({ ...formData, emergencyPhone: e.target.value })
                                }
                                className="w-full rounded-xl border border-input bg-background p-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-border pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-input px-4 py-2 text-sm font-semibold hover:bg-muted"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                            {isLoading && <Loader2 className="size-4 animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}