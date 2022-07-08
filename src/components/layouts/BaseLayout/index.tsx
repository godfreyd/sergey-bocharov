import React, { FC } from 'react';

import { PageMetadata } from '../../PageMetadata';
import { Header } from '../../Header';
import { Main, IMain } from '../../Main';
import { Footer } from '../../Footer';

export interface ILayoutOptions extends IMain {
    noFooter?: boolean;
}

export const BaseLayout: FC<ILayoutOptions> = ({
    children,
    noFooter = false,
}) => (
    <>
        <PageMetadata />
        <Header />
        <Main>{children}</Main>
        {!noFooter && <Footer />}
    </>
);
