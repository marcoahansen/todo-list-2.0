import Login from "@/components/Login";
import { getSession } from "@/pages/api/auth/session";
import User from "@/components/User";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";

async function HomePage() {
  const session = await getSession();

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <User
            user={{
              name: session.user?.name,
              image: session.user?.image,
              email: session.user?.email,
            }}
          />
          <div className=" w-[97%] md:max-w-[500px] flex flex-col justify-start gap-1 bg-[#515151] p-5 rounded-lg shadow-lg min-h-[73vh]">
            <h2 className="mb-2">Organize suas Tarefas!</h2>
            <TaskInput
              user={{
                name: session.user?.name,
                image: session.user?.image,
                email: session.user?.email,
              }}
            />
            <TaskList
              user={{
                name: session.user?.name,
                image: session.user?.image,
                email: session.user?.email,
              }}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default HomePage;
