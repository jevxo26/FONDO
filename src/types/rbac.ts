export interface ModulePermission {
  module: string;
  label: string;
  base: boolean;
  toggleable: boolean;
  granted: boolean;
}

export interface PermissionModulesResponse {
  modules: ModulePermission[];
  overrides: UserPermissionOverride[];
}

export interface UserPermissionOverride {
  module: string;
  type: "GRANT" | "REVOKE";
}

export interface ToggleModulePayload {
  module: string;
  enabled: boolean;
}
