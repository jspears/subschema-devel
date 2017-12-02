import React, { Component } from 'react';
import PropTypes from 'subschema-prop-types';
import route from '@funjs/route-parser/dist/index.umd';

function matcher(obj) {
    const arr = Object.keys(obj).map(function makeMatch(key) {
        return { match: route(key).match, component: obj[key] };
    });

    return function (path, resolve) {
        for (const cur of arr) {
            const props = cur.match(path);
            if (props) {
                if (!cur.Component) {
                    cur.Component = resolve(cur.component)
                }
                return [props, cur.Component];
            }
        }
        return null;
    }
}

export default class Routes extends Component {
    static template = false;

    static matcher = matcher;

    static contextTypes = {
        loader  : PropTypes.loader,
        injector: PropTypes.injector
    };

    static propTypes    = {
        notFound: PropTypes.type,
        routes  : PropTypes.object,
        pathname: PropTypes.value
    };
    static defaultProps = {
        pathname: "@pathname",
        notFound: "NotFound"
    };

    componentWillMount() {
        this.matches = Routes.matcher(this.props.routes);
    }

    componentWillRecieveProp(props) {
        if (props.routes != this.props.routes) {
            this.matches = Routes.matcher(props);
        }
    }

    resolve = (component) => {
        if (typeof component == 'string') {
            const Component = this.context.loader.loadType(component);
            if (Component) {
                return this.context.injector.inject(Component);
            }
        }
        return component;
    };
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log(error, info);
    }
    render() {
        const { pathname } = this.props;
        let to             = this.matches(pathname, this.resolve);
        if (to) {
            const [props, Component] = to;
            if (Component) {
                return <Component {...props}/>
            }
        }
        const Component = this.resolve(this.props.notFound);
        return <Component location={this.props.pathname}/>

    }
}
