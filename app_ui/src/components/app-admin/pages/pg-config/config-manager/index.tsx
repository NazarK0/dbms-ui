import { Accordion } from '../../../../ui/accordion';
import { Card, CardContent } from '../../../../ui/card';
import PgConfigHeader from './PgConfigHeader';
import ConfigCategoryItem from './ConfigCategoryItem';
import { getCategories, getParamsByCategory } from './utils/filters';

import { useState } from 'react';
import { usePgConfigData } from './usePgConfigData';


export default function ConfigManager() {
    const { data: params, isLoading, error } = usePgConfigData();
        
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    const categories = getCategories(params!);

    const [hasChanges, setHasChanges] = useState(false);

    const handleParamChange = (paramName: string, value: string) => {
        setHasChanges(true);
        console.log(`Parameter ${paramName} changed to ${value}`);
    };


    return (
        <Card className="border-slate-200 shadow-sm">
            <PgConfigHeader />
            <CardContent>
                <Accordion type="multiple" defaultValue={[]} className="space-y-3">
                    {categories.map((category) => {
                        const categoryParams = getParamsByCategory(params!, category);
                        return (
                            <ConfigCategoryItem
                                key={category}
                                category={category}
                                params={categoryParams}
                                onParamChange={handleParamChange}
                            />
                        );
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}

