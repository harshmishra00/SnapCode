import { getServerSession } from "next-auth";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/resizable";
import CodeEditor from "@/app/(dashboard)/snap/[id]/_components/code-editor";
import { languageOptions } from "@/config/languages";
import { authOptions } from "@/lib/auth";
import { GetSnap } from "@/actions";
import { BackToHomeButton } from "@/app/(dashboard)/snap/[id]/_components/back-to-home-button";
import RunButton from "@/app/(dashboard)/snap/[id]/_components/run-button";
import SaveButton from "@/app/(dashboard)/snap/[id]/_components/save-button";
import OutputArea from "@/app/(dashboard)/snap/[id]/_components/output-area";
import SnapInfoButton from "@/app/(dashboard)/snap/[id]/_components/snap-info-button";
import { NavMenu } from "@/components/nav-menu";

export default async function page({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    let snap;

    try {
        snap = await GetSnap(params.id);
    } catch (error) {
        // TODO: Make Page for the failed loading Snippet
        return <div>Unable to load snap. Please try again later.</div>;
    }

    // If no snap is found
    if (!snap) {
        // TODO: Make Page for No Snaps Found
        return <div>No snaps found.</div>;
    }

    const { name, language, code, authorId, visibility } = snap;

    // Check if the user is authorized to view the snap
    if (!(session?.user?.id === authorId || visibility === "public")) {
        return (
            <div>
                You are not authorized to view this snap. Contact the owner for
                access.
            </div>
        );
    }

    function getImageUrlByLanguageName(languageName: string) {
        const language = languageOptions.find(
            (lang) => lang.name === languageName,
        );

        return language ? language.imageURL : "/logo.svg";
    }

    function getMonacoEditorLangByLanguageName(languageName: string) {
        const language = languageOptions.find(
            (lang) => lang.name === languageName,
        );

        return language?.monacoEditorLang;
    }

    function getLanguageVersionByLanguageName(languageName: string) {
        const language = languageOptions.find(
            (lang) => lang.name === languageName,
        );

        return language?.version;
    }

    return (
        <>
            <nav className="grid w-full grid-cols-3 items-center justify-between border-b border-content3 bg-content2 px-4 py-2">
                <div className="flex select-none items-center">
                    <BackToHomeButton />
                    <SnapInfoButton
                        imgURL={getImageUrlByLanguageName(language)}
                        snapName={name}
                    />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <SaveButton />
                    <RunButton />
                </div>
                <div className="flex h-full items-center justify-end">
                    <NavMenu size={24} />
                </div>
            </nav>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    className="h-[calc(100svh-50px)]"
                    defaultSize={50}
                    minSize={40}
                >
                    <CodeEditor
                        initialCode={code}
                        language={
                            getMonacoEditorLangByLanguageName(language) ||
                            "plaintext"
                        }
                        snapId={snap.id || ""}
                        version={getLanguageVersionByLanguageName(language)}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel
                    className="h-[calc(100svh-50px)]"
                    defaultSize={50}
                    minSize={40}
                >
                    <div className="h-full bg-content1 p-4">
                        <OutputArea />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
}
