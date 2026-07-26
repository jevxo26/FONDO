// src/components/dashboard/vendor/settings/profile-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { vendorProfile } from "@/data/vendor-settings";

export function ProfileForm() {
  const [formData, setFormData] = useState(vendorProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", formData);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Name</Label>
          <Input
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Owner Name</Label>
          <Input
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Business Type</Label>
          <Input
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Business Category</Label>
          <Input
            value={formData.businessCategory}
            onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Founded Year</Label>
          <Input
            value={formData.foundedYear}
            onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Employee Count</Label>
          <Input
            value={formData.employeeCount}
            onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Website</Label>
          <Input
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          disabled={!isEditing}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Facebook</Label>
          <Input
            value={formData.facebook}
            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>Instagram</Label>
          <Input
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label>YouTube</Label>
          <Input
            value={formData.youtube}
            onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
            disabled={!isEditing}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {!isEditing ? (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </>
        )}
      </div>
    </form>
  );
}