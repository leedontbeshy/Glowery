export interface CreateBlacklistDTO {
  token: string;
  type: "access" | "refresh";
  user_id?: number;
  reason?: string;
  expires_at?: Date;
}