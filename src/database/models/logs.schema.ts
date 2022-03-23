import {Document, Model, model, Schema} from 'mongoose';

import { ILogs } from '../../models';
import { TableNamesEnum } from '../../constants';

export type LogsType = ILogs & Document;

export const LogsSchema = new Schema<ILogs>({ // LogsSchema: Schema
  event: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  data: Schema.Types.Mixed,
  createdAt: {
    type: Date as any, // TODO fix incompatible types
    default: Date.now() as any
  }
});

export const LogsModel: Model<LogsType> = model<LogsType>(TableNamesEnum.LOGS, LogsSchema);
