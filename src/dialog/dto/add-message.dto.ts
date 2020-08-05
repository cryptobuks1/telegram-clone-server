export interface AddMessageDto {
  readonly text: string;
  readonly type: string;
  readonly userId: string;
  readonly dialogId: string;
}
