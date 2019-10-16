
import * as React from 'react';
import '../App.css';

import HomePageContainer from '../containers/homePageContainer';

const App: React.SFC<{}> = () => {
    return (
        <>
        <h1>Hi React(Redux) < /h1>
            < HomePageContainer />
            </>
  );
};

export default App;