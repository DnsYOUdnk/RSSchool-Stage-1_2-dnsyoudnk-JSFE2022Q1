import './sources.css';
import { IDraw, Source } from '../../../types/index';

class Sources implements IDraw<Source> {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceItem.setAttribute('data-source-id', item.id);

            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            sourceName.textContent = item.name;

            fragment.append(sourceClone);
        });

        const sourcesBtnItems = document.querySelector('.sources') as HTMLDivElement;
        sourcesBtnItems.append(fragment);
    }
}

export default Sources;
