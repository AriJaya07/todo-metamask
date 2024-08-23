export interface TodoList {
    id: number,
    name: string,
    status: string,
    createdAt: string,
    updatedAt: string
}

export interface TaskActive {
    all: boolean;
    active: boolean;
    completed: boolean;
  }
  
  export interface ToastShow {
    success: boolean;
    failed: boolean;
  }