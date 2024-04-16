import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import AppRouter from "./router/AppRouter.tsx";
import {QueryClient, QueryClientProvider} from "react-query";

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                staleTime: 60 * 1000,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AppRouter/>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    limit={3}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    toastStyle={{
                        background: "#262F38",
                    }}

                />
            </BrowserRouter>
        </QueryClientProvider>)
}

export default App
