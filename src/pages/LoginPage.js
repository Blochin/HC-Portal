import React, { useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import request from "utils/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ToastOptions";
import { HiEye, HiEyeOff } from "react-icons/hi";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [isRegistration, setIsRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const toastId = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordVisibility = (isConfirmPassword) => {
    if (isConfirmPassword) {
      setShowPasswordConfirm((prevState) => !prevState);
    } else {
      setShowPassword((prevState) => !prevState);
    }
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistration) {
      if (formData.password !== formData.confirm_password) {
        toast.error(
          "Password and confirm password do not match.",
          toastOptions,
        );
        return;
      }
    }
    toastId.current = toast("Loading...", {
      ...toastOptions,
      autoClose: false,
    });
    try {
      const endpoint = isRegistration ? "api/register" : "api/login";
      const response = await request.post(endpoint, formData);

      if (!isRegistration) {
        toast.update(toastId.current, {
          ...toastOptions,
          render: "Submit successfully",
          type: "success",
        });
        navigate("/dashboard");

        login(response.data.data, formData["email"]);
      } else {
        toast.update(toastId.current, {
          ...toastOptions,
          render: "Submit successfully",
          type: "success",
        });
        setIsRegistration(false);
      }
    } catch (error) {
      let text =
        "You have entered an invalid email address or password, or your account has not been activated.";
      if (isRegistration) {
        text =
          "Registration failed. Please contact the system administrator: admin@hcportal.eu";
      }
      toast.update(toastId.current, {
        ...toastOptions,
        render: text,
        type: "error",
      });
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
                      value={`Your ${fieldName.replace("_", " ")}`}
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

          {["email"].map((fieldName) => (
            <div key={fieldName}>
              <div className="mb-2 block">
                <Label
                  htmlFor={fieldName}
                  value={`Your ${fieldName} ${
                    fieldName === "email" ? "address" : ""
                  }`}
                />
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

          <div key={"password"} className={"relative"}>
            <div className="mb-2 block">
              <Label htmlFor={"password"} value={`Your password`} />
            </div>
            <TextInput
              id={"password"}
              name={"password"}
              type={showPassword ? "text" : "password"}
              placeholder={"password"}
              value={formData["password"]}
              onChange={handleInputChange}
              required
            />
            {showPassword ? (
              <HiEyeOff
                onClick={() => togglePasswordVisibility(false)}
                className={
                  "absolute right-3 top-11 text-gray-500 cursor-pointer"
                }
              />
            ) : (
              <HiEye
                className={
                  "absolute right-3 top-11 text-gray-500 cursor-pointer"
                }
                onClick={() => togglePasswordVisibility(false)}
              />
            )}
          </div>

          {isRegistration && (
            <div key={"confirm_password"} className={"relative"}>
              <div className="mb-2 block">
                <Label
                  htmlFor={"confirm_password"}
                  value={`Your confirm password `}
                />
              </div>
              <TextInput
                id={"confirm_password"}
                name={"confirm_password"}
                type={showPasswordConfirm ? "text" : "password"}
                placeholder={"password"}
                value={formData["confirm_password"]}
                onChange={handleInputChange}
                required
              />
              {showPasswordConfirm ? (
                <HiEyeOff
                  onClick={() => togglePasswordVisibility(true)}
                  className={
                    "absolute right-3 top-11 text-gray-500 cursor-pointer"
                  }
                />
              ) : (
                <HiEye
                  className={
                    "absolute right-3 top-11 text-gray-500 cursor-pointer"
                  }
                  onClick={() => togglePasswordVisibility(true)}
                />
              )}
            </div>
          )}

          <div className={"text-gray-700"}>
            <div>
              {!isRegistration ? (
                <>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Don't have an account yet?{" "}
                  <span
                    className={"text-blue-500 cursor-pointer"}
                    onClick={() => setIsRegistration(!isRegistration)}
                  >
                    Create one now
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className={"text-blue-500 cursor-pointer"}
                    onClick={() => setIsRegistration(!isRegistration)}
                  >
                    Login
                  </span>
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
