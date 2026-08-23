import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

export default function SnapInfoButton({
    imgURL,
    snapName,
}: {
    snapName: string;
    imgURL: string;
}) {
    return (
        <Button
            className="flex h-8 min-w-fit cursor-pointer items-center gap-2 rounded px-2"
            variant="light"
        >
            <Image height={20} radius="sm" src={imgURL} width={20} />
            <h1 className="line-clamp-1 max-w-60 text-sm">{snapName}</h1>
        </Button>
    );
}
