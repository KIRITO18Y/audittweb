import { useNavigate } from 'react-router-dom';
export const Logo = () => {
    const navigator = useNavigate();
    const defaultLogo = `${import.meta.env.BASE_URL}initials-logo.svg`;
    
    const handleClick = () => {
        navigator('/Business/Business');
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-4 bg-blue-50 pr-4 rounded-lg border-r-2 border-blue-200 cursor-pointer"
        >
            <div className="shrink-0">
                <img
                    src={defaultLogo}
                    alt="logo"
                    className="h-full w-full rounded-lg max-h-[64px] p-1 radius-sm"
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultLogo;                       
                    }}
                />
            </div>
            <div className="shrink-0">
                <span>{"Empresa"}</span>
            </div>
        </div>
    );
};

