import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //1, khi load trang, goi api /refresh-token len .NET
        //2, neu success -> cookie hop le, setAccessToken (token moi)
        //3, neu fail -> cookie khong hop le, setAccessToken(null)
        //4, set isloading(false)
        const silentRefresh = async () => {
            try {
                //api goi refresh token
                const response = await fetch('', {
                    method: 'POST',
                    credentials: 'include', //gui cookie len server
                });
                const data = await response.json();
                setAccessToken(data.accessToken);
            } catch {
                setAccessToken(null);
            } finally {
                setIsLoading(false);
            }
        };
        silentRefresh();
    }, []);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
 

