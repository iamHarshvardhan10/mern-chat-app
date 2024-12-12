import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Auth = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 shadow-2xl w-[80vw] md:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        {/* Left Section */}
        <div className="flex items-center justify-center flex-col p-8">
          <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
          <p className="mt-4 text-center text-gray-600">
            Fill in the details to get started with the best chat app!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4">
            {/* Tabs List */}
            <TabsList className="flex w-full">
              <TabsTrigger
                value="login"
                className="w-full text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:font-semibold data-[state=active]:text-purple-500 data-[state=active]:border-b-purple-500"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-full text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:font-semibold data-[state=active]:text-purple-500 data-[state=active]:border-b-purple-500"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="login" className="pt-8">
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-all"
                >
                  Login
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="pt-8">
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-all"
                >
                  Signup
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
