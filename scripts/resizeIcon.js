import { readFileSync, writeFileSync } from 'fs';
import resizeImage from 'resize-img';

const ICON_NAME = 'icon';
const ICON_PATH = `scripts/${ICON_NAME}.png`;
const sizes = [16, 32, 48, 128];

const resizeIcon = async () => {
    const iconBuffer = readFileSync(ICON_PATH);
    sizes.forEach(async (size) => {
        const image = await resizeImage(iconBuffer, {
            width: size,
            height: size
        });

        writeFileSync(`public/icons/${ICON_NAME}_${size}.png`, image);
    });
}

resizeIcon();