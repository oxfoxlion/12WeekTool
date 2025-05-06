import { supabase } from "../lib/supabaseClient";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();

    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();



    const onSubmit = handleSubmit((inputData) => {

        const signUpdata = {
            email: inputData.signUpEmail,
            password: inputData.signUpPassword,
            options: {
              data: {
                display_name: inputData.display_name,
              }
            }
          }

        postSignUpData(signUpdata);
        reset();

    })

    const postSignUpData = async (signUpdata: { email: string, password: string }) => {
        try {
            const { data, error } = await supabase.auth.signUp(signUpdata)

            if (data.user) {
                navigate('/signIn')
            }

            if (error) {
                return
            }

        }

        catch (err) {
            console.log('error')
        }
    }

    return (
        <div className="container">

            <div className="py-5">
                <form onSubmit={onSubmit}>
                <div className="flex flex-col mb-5 gap-2">
                        <label htmlFor="display_name" className="text-gray-600">暱稱</label>
                        <input type="text" placeholder="請輸入您的Email" id="display_name" className="border p-2 rounded border-gray-400"
                            {...register('display_name', {
                                required: '還沒有填寫暱稱唷'
                            })} />
                        {errors.title && <p className="text-red-600 my-3">{errors.display_name?.message?.toString()}</p>}
                    </div>
                    <div className="flex flex-col mb-5 gap-2">
                        <label htmlFor="signUpEmail" className="text-gray-600">Email</label>
                        <input type="email" placeholder="請輸入您的Email" id="signUpEmail" className="border p-2 rounded border-gray-400"
                            {...register('signUpEmail', {
                                required: '還沒有填寫Email唷'
                            })} />
                        {errors.title && <p className="text-red-600 my-3">{errors.signUpEmail?.message?.toString()}</p>}
                    </div>
                    <div className="flex flex-col mb-3 gap-2">
                        <label htmlFor="signUpPassword" className="text-gray-600">Password</label>
                        <input type="password" placeholder="請輸入您的密碼" id="signUpPassword" className="border p-2 rounded border-gray-400"
                            {...register('signUpPassword', {
                                required: '還沒有填寫密碼唷'
                            })} />
                        {errors.title && <p className="text-red-600 my-3">{errors.signUpPassword?.message?.toString()}</p>}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button type="submit" className="bg-gray-100 p-3">註冊</button>
                        <Link to='/signIn' className="bg-gray-100 p-3">已經有帳號了嗎？</Link>
                    </div>

                </form>


            </div>
        </div>

    )
}