import { Card, CardContent } from '../../../../ui/card';
import SaveProfileDialog from './SaveProfileDialog';
import ImportDialog from './ImportDialog';
import ProfilesHeader from './ProfilesHeader';
import ProfileCard from './ProfileCard';
import EmptyState from './EmptyState';
import { useEffect, useState } from 'react';
import { usePgConfigProfilesData } from './usePgConfigProfilesData';
import { ConfigProfile } from './types';

export default function ProfilesManager() {

    const { data: initialProfiles, isLoading, error } = usePgConfigProfilesData();


    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [importDialogOpen, setImportDialogOpen] = useState(false);
    const [profiles, setProfiles] = useState<ConfigProfile[]>([]);

    useEffect(() => {
        if (initialProfiles) {
            setProfiles(initialProfiles);
        }
    }, [initialProfiles]);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    

    const handleSaveProfile = (name: string, description: string) => {
        const newProfile = {
            id: Date.now().toString(),
            name,
            description,
            createdAt: new Date().toLocaleString('uk-UA'),
            parametersCount: 22, // This should ideally come from the current configuration state
        };
        setProfiles([...profiles, newProfile]);
        console.log('Profile saved:', newProfile);
    };

    const handleImportFile = (file: File) => {
        console.log('Importing file:', file.name);
    };

    const handleApplyProfile = (profileId: string) => {
        console.log('Applying profile:', profileId);
    };

    const handleDownloadProfile = (profileId: string) => {
        console.log('Downloading profile:', profileId);
    };

    const handleDeleteProfile = (profileId: string) => {
        setProfiles(profiles.filter(p => p.id !== profileId));
        console.log('Profile deleted:', profileId);
    };

    return (
        <>
            <Card className="border-slate-200 shadow-sm">
                <ProfilesHeader
                    onImport={() => setImportDialogOpen(true)}
                    onSave={() => setSaveDialogOpen(true)}
                />
                <CardContent>
                    <div className="space-y-3">
                        {profiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                profile={profile}
                                onApply={handleApplyProfile}
                                onDownload={handleDownloadProfile}
                                onDelete={handleDeleteProfile}
                            />
                        ))}

                        {profiles.length === 0 && (
                            <EmptyState onCreateProfile={() => setSaveDialogOpen(true)} />
                        )}
                    </div>
                </CardContent>
            </Card>

            <SaveProfileDialog
                open={saveDialogOpen}
                onOpenChange={setSaveDialogOpen}
                parametersCount={22} // This should ideally reflect the actual number of parameters in the current configuration
                onSave={handleSaveProfile}
            />

            <ImportDialog
                open={importDialogOpen}
                onOpenChange={setImportDialogOpen}
                onImport={handleImportFile}
            />
        </>
    );
}

