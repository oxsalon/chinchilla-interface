
export default function Button({children, onClick, disabled}: any) {
    return (
        <button disabled={disabled} onClick={onClick} className="btn flex items-center justify-center">
            <style jsx>{`
                .btn {
                    background: linear-gradient(89.92deg, #BE35FF 1.29%, #7635FF 99.94%), rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    width: 100%;
                    height: 50px;
                    &[disabled] {
                        opacity: 0.25;
                    }
                }
            `}</style>
            {children}
        </button>
    )
}