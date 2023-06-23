import { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width: number;
    height: number;
}

function Image({ src, alt, width, height, ...props }: ImageProps){
    return (
        <img
            src={src}
            alt={alt}
            {...props}
            style={{
                width,
                height,
                objectFit: 'cover',
            }}
        />
    );
};

export default Image;
