import React from "react";

interface COProps {
  className?: string;
  onClickOutside: (e: MouseEvent) => unknown;
}

export default class ClickOutsideListener extends React.Component<COProps> {
  wrapper: React.RefObject<HTMLDivElement>;

  constructor(props: COProps) {
    super(props);
    this.wrapper = React.createRef();
  }

  windowClick = (e: MouseEvent) => {
    const wrapperElem = this.wrapper.current;
    if (wrapperElem && !wrapperElem.contains(e.target as HTMLElement)) {
      this.props.onClickOutside(e);
    }
  };

  componentDidMount = () => {
    window.addEventListener("click", this.windowClick);
  };

  componentWillUnmount() {
    window.removeEventListener("click", this.windowClick);
  }

  render() {
    return (
      <div ref={this.wrapper} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
