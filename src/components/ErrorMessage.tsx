type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <p className="bg-red-50 text-red-600 font-bold uppercase text-center p-3">{children}</p>
    )
}

