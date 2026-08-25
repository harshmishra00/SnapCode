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
            alt="SnapCode"
            className={className}
            height={height}
            src="/logo.svg"
            width={width}
        />
    );
}
