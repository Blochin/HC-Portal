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
          placeholder="name@flowbite.com"
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
  );
}

export default LoginPage;
