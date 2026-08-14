export interface UserDevice {
  id: string;
  deviceId: string;
  deviceName?: string;
  deviceType: "mobile" | "tablet" | "desktop";
  operatingSystem?: string;
  osVersion?: string;
  appVersion?: string;
  browser?: string;
  ipAddress?: string;
  lastActiveAt?: string;
}

export interface LoginHistoryEntry {
  id: string;
  deviceId?: string;
  ipAddress?: string;
  browser?: string;
  platform?: string;
  country?: string;
  city?: string;
  loginMethod?: string;
  loginStatus?: string;
  loggedInAt?: string;
  loggedOutAt?: string;
}
