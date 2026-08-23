interface BrandLogoProps {
    height?: string;
    width?: string;
    className?: string;
}

export default function BrandLogo({
    height = "36",
    width = "36",
    className,
}: BrandLogoProps) {
    return (
        <img
            src="/logo.svg"
            alt="SnapCode"
            height={height}
            width={width}
            className={className}
        />
    );
}