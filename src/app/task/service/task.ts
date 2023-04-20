export class Task {
  id: number;
  user: any;
  title: string;
  description: string;
  createDate: string;
  progress: string;
  priority: string;
  deadLine: string;

  //constructor
  constructor(task?: Task) {
    this.id = task?.id ?? 0;
    this.user = task?.user ?? null;
    this.title = task?.title ?? '';
    this.description = task?.description ?? '';
    this.createDate = task?.createDate ?? '';
    this.progress = task?.progress ?? '';
    this.priority = task?.priority ?? '';
    this.deadLine = task?.deadLine ?? '';

  }
}






