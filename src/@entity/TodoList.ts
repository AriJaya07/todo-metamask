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
    chart: boolean
  }
  
  export interface ToastShow {
    success: boolean;
    failed: boolean;
  }

  export interface DataTodo {
    id?: number
    userId: number
    title: string;
    status: string;
    createdAt: string;
  }