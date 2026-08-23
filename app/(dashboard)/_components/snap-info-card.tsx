"use client";

import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Divider } from "@nextui-org/divider";

import CardMenu from "@/app/(dashboard)/_components/card-menu";
import { languageOptions } from "@/config/languages";
import { usePRouter } from "@/components/custom-router";

interface SnapInfoCardProps {
    title: string;
    language: string;
    createdAt: string;
    id: string;
}

export default function SnapInfoCard({
    title,
    language,
    createdAt,
    id,
}: SnapInfoCardProps) {
    const router = usePRouter();

    function getImageUrlByLanguage(languageName: string) {
        const language = languageOptions.find(
            (lang) => lang.name === languageName,
        );

        return language ? language.imageURL : "/logo.svg";
    }

    return (
        <Card
            isHoverable
            isPressable
            className="border border-transparent hover:border-foreground-400"
            onPress={() => router.push(`/snap/${id}`)}
        >
            <CardHeader className="flex justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Image
                        height={45}
                        radius="sm"
                        src={getImageUrlByLanguage(language)}
                        width={45}
                    />
                    <div className="flex flex-col text-left">
                        <p
                            className="text-md max-w-60 overflow-hidden text-ellipsis text-nowrap"
                            title={title}
                        >
                            {title}
                        </p>
                        <p className="text-small text-default-500">
                            {language}
                        </p>
                    </div>
                </div>
                <CardMenu snapId={id} />
            </CardHeader>
            <Divider />
            <CardFooter>
                <p className="text-xs opacity-70">Created {createdAt}</p>
            </CardFooter>
        </Card>
    );
}
