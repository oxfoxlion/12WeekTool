import { supabase } from "../lib/supabaseClient";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();

    // Google登入
    const handleGoogleSignIn = async () => {

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })

            if (error) {
                console.log('登入失敗')
                return
            }

            console.log('正在導向 Google 登入頁面...')
        }
        catch (err) {
            console.log('發生錯誤')

        }

    }

    // 手動登入
    const onSubmit = handleSubmit((inputData) => {

        const signIndata = {
            email: inputData.signInEmail,
            password: inputData.signInPassword
        }

        postSignInData(signIndata);
        reset();

    })

    const postSignInData = async (signIndata: { email: string, password: string }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword(signIndata)

            if (data.user) {
                navigate('/user')
            }

            if (error) {
                console.log('登入失敗')
                return
            }
        }

        catch (err) {
            console.log('發生錯誤', err)
        }
    }

    return (
        <div className="container">

            <div className="py-5">
                <form onSubmit={onSubmit}>

                    <div className="flex flex-col mb-5 gap-2">
                        <label htmlFor="signInEmail" className="text-gray-600">Email</label>
                        <input type="email" placeholder="請輸入您的Email" id="signInEmail" className="border p-2 rounded border-gray-400"
                            {...register('signInEmail', {
                                required: '還沒有填寫Email唷'
                            })} />
                        {errors.title && <p className="text-red-600 my-3">{errors.signInEmail?.message?.toString()}</p>}
                    </div>
                    <div className="flex flex-col mb-3 gap-2">
                        <label htmlFor="signInPassword" className="text-gray-600">Password</label>
                        <input type="password" placeholder="請輸入您的密碼" id="signInPassword" className="border p-2 rounded border-gray-400"
                            {...register('signInPassword', {
                                required: '還沒有填寫密碼唷'
                            })} />
                        {errors.title && <p className="text-red-600 my-3">{errors.signInPassword?.message?.toString()}</p>}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button type="submit" className="bg-gray-100 p-3">登入</button>
                        <Link to='/signUp' className="bg-gray-100 p-3"> 註冊</Link>
                    </div>

                </form>


            </div>

            <button type="button" onClick={handleGoogleSignIn} className="border p-3 rounded rounded-full">使用google登入</button>
        </div>

    )
}