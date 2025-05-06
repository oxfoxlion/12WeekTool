import { NavLink,useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"

export default function Header() {
    const [isSignIn, setIsSignIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getIsSignIn()
    }, [])

    const getIsSignIn = async () => {
        try {
            const { data } = await supabase.auth.getSession()

            if (data.session) {
                setIsSignIn(!!data.session);
            } else {
                setIsSignIn(false);
            }
        }
        catch (err) {
            console.log('發生錯誤', err)
        }
    }

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()

            if (error) {
                console.log('登出失敗', error.message)
            }else{
                navigate('/');
            }
        } catch (err) {
            console.log('發生錯誤', err)
        }

    }

    return (
        <div className="bg-gray-100">
            <div className="container">
                <div className="flex justify-between p-3">
                <NavLink to="/"> <h1 className="text-xl">12週計畫小工具</h1></NavLink> 
                    <ul>
                    {isSignIn === true ?
                        <li><button type="button" onClick={handleSignOut}>登出</button></li>
                        :
                        <li>
                            <NavLink to="/signIn">登入</NavLink>
                        </li>
                        
                    }

                    </ul>


                </div>
            </div>
        </div>


    )
}