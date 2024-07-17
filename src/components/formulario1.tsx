import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let contadorPerform = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

const Formulario1: React.FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
    },
    mode: "onBlur", // ou "onChange"

    //ou pode testar com uma chamada da api direto
    // defaultValues: async () => {
    //   const response = await fetch(
    //     "https://jsonplaceholder.typicode.com/users/1"
    //   );
    //   const data = await response.json();
    //   return {
    //     username: "",
    //     email: data.email,
    //     channel: "",
    //   };
    // },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  //   const { name, ref, onChange, onBlur } = register("username");
  //   posso usar assim por desestruturação ou ....

  const onSubmit = (data: FormValues) => {
    console.log("Click no botão", data);
  };

  contadorPerform++;
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <p>Exemplo de performance ({contadorPerform / 2})</p>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username obrigatório" })}
              //   register ja vai me dar todos os atributos anteriores e com isso eu posso editar só o necessario
              //   name={name}
              //   ref={ref}
              //   onChange={onChange}
              //   onBlur={onBlur}
            />
          </div>
          <p className="text-red-500">{errors.username?.message}</p>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email invalido",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@example.com" ||
                      "Usar um email diferente"
                    );
                  },
                  noBlackListed: (fieldValue) => {
                    return (
                      !fieldValue.endsWith("testDominio.com") ||
                      "Dominio invalido"
                    );
                  },
                },
              })}
            />
          </div>
          <p className="text-red-500">{errors.email?.message}</p>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="channel">
              Channel
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="channel"
              type="text"
              placeholder="Channel"
              {...register("channel", {
                minLength: 3,
                required: {
                  value: true,
                  message: "Channel precisa ter pelo menos 3 caracteres",
                },
              })}
            />
          </div>
          <p className="text-red-500">{errors.channel?.message}</p>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="twitter">
              Twitter
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="twitter"
              type="text"
              placeholder="twitter"
              {...register("social.twitter", {
                required: {
                  value: true,
                  message: "Add uma conta do twitter",
                },
              })}
            />
          </div>
          <p className="text-red-500">{errors.social?.twitter?.message}</p>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default Formulario1;
