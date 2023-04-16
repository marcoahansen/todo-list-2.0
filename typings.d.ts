interface User {
  user: {
    name: string | null | undefined;
    image: string | null | undefined;
    email: string | null | undefined;
  };
}

interface Task {
  task: string;
  createdAt: admin.firestore.Timestamp;
  tip: string;
  completed: boolean;
  user: {
    _id: string;
    name: string;
  };
}
