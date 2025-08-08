export const TitlePrincipal = ({
    title,
}: {
    title: string;
}) => {
    return (
        <h1 className="text-xl sm:text-2xl font-semibold">
            {title}
        </h1>
    );
};