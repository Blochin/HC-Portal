import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import request from "utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isRegistration, setIsRegistration] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const endpoint = isRegistration ? "api/register" : "api/login";
      const response = await request.post(endpoint, formData);

      if (!isRegistration) {
        navigate("/dashboard");
        login(response.data.data);
      } else {
        setIsRegistration(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="flex md:w-2/3 w-full p-4 bg-white shadow-2xl border border-gray-100 rounded-lg">
        <form
          className="flex w-full flex-col gap-4 justify-center"
          onSubmit={handleSubmit}
        >
          <h1 className={"text-xl"}>
            {isRegistration ? "Registration" : "Login"}
          </h1>

          {isRegistration && (
            <>
              {["first_name", "last_name"].map((fieldName) => (
                <div key={fieldName}>
                  <div className="mb-2 block">
                    <Label
                      htmlFor={fieldName}
                      value={fieldName.replace("_", " ")}
                    />
                  </div>
                  <TextInput
                    id={fieldName}
                    name={fieldName}
                    type="text"
                    placeholder={fieldName === "first_name" ? "Joe" : "Morgan"}
                    value={formData[fieldName]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
            </>
          )}

          {["email", "password"].map((fieldName) => (
            <div key={fieldName}>
              <div className="mb-2 block">
                <Label htmlFor={fieldName} value={`Your ${fieldName}`} />
              </div>
              <TextInput
                id={fieldName}
                name={fieldName}
                type={fieldName === "password" ? "password" : "email"}
                placeholder={
                  fieldName === "password" ? "password" : "user@hcportal.eu"
                }
                value={formData[fieldName]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <div className={"text-gray-700"}>
            <div>
              {!isRegistration ? (
                <>
                  You do not have an account yet? Click on the{" "}
                  <span
                    className={"text-blue-500 cursor-pointer"}
                    onClick={() => setIsRegistration(!isRegistration)}
                  >
                    register
                  </span>{" "}
                  button to register
                </>
              ) : (
                <>
                  Already have an account? Click on the{" "}
                  <span
                    className={"text-blue-500 cursor-pointer"}
                    onClick={() => setIsRegistration(!isRegistration)}
                  >
                    login
                  </span>{" "}
                  button.
                </>
              )}
            </div>
          </div>
          <Button className={"w-full"} type="submit">
            {isRegistration ? "Register" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
