import { Paper } from "@material-ui/core";

import styles from "./Box.module.css"

function Box(props) {
    const { children } = props;
    return <Paper elevation={3} className={styles.box}>{children}</Paper>;
}

export default Box