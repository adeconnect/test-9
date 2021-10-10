
import 'bootstrap/dist/css/bootstrap.min.css'

import './my-custom-style.css'

const App = (props) => {
    const {children, ...rest} = props;
    const PageComponent = children;
    return <PageComponent {...rest} />
};


export default App;