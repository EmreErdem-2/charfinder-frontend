import CollapsibleList from "./CollapsibleList"
import { fetchCollectionsPaged } from "../services/usePagination";

// ilk page load ettiğinde yalnızca ancestry fetch etmeli diğerleri etmemeli
// bir önceki selected olduğunda, selected item'ın özel operation'ı var mı diye bakılır (extra feat skill seçme gibi)
// varsa ona göre o operaiton'ın belirlediği kıstaslarda fetch eden bir collapsible list getirilir
// selected seçilen bilgileri kaydedilir. Operational  bazı bilgileri char sheet state'ine kaydedilir
// (sonradan char sheet için görsel alanı oluşturulacak ve render ettirilecek)
// burada characterin seçtiği ancestery veya class gibi özelliklerin trait_id'leri ile bir sonraki adımlar fetchlenir


export const CharacterCreation = () => {
    return (
        <>
        <div style={{ maxWidth: 480 }}>
        <CollapsibleList
            fetchPage={fetchCollectionsPaged}
            collection="ancestries"
            filter="deprecated!=true"
            fields="id,name,rarity,description,deprecated"
            sort="name-asc"
            pageSize={8}
            placeholder="Choose an ancestry"
            initiallyOpen={false}
        />
        </div>
        <div style={{ maxWidth: 480 }}>
        <CollapsibleList
            fetchPage={fetchCollectionsPaged}
            collection="classes"
            filter="deprecated!=true"
            fields="id,name,rarity,description,deprecated"
            sort="name-asc"
            pageSize={8}
            placeholder="Choose a class"
            initiallyOpen={false}
        />
        </div>
        <div style={{ maxWidth: 480 }}>
        <CollapsibleList
            fetchPage={fetchCollectionsPaged}
            collection="backgrounds"
            filter="deprecated!=true"
            fields="id,name,rarity,description,deprecated"
            sort="name-asc"
            pageSize={8}
            placeholder="Choose a background"
            initiallyOpen={false}
        />
        </div>
        <div style={{ maxWidth: 480 }}>
        <CollapsibleList
            fetchPage={fetchCollectionsPaged}
            collection="feats"
            filter="deprecated!=true"
            fields="id,name,rarity,level,description,deprecated"
            sort="level-asc,name-asc"
            pageSize={8}
            placeholder="Choose a feat"
            initiallyOpen={false}
        />
        </div>

        </>
    );
}