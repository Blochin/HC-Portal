import { Button, Label, TextInput } from "flowbite-react";
import request from "utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const credentials = { email, password };

    try {
      const response = await request.post("api/login", credentials);
      login(response.data.data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex md:w-2/3 w-full p-4 bg-white shadow-2xl border border-gray-100  rounded-lg">
        <form
          className="flex w-full flex-col gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="user@hcportal.eu"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput id="password" name="password" type="password" required />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
