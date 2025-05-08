import { Button, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const NavigationButton = ({
    icon: IconComponent,
    label,
}) => {
    const [isHover, setIsHover] = useState(false);
    return (
        <Button
            bg="white"
            onClick={()=>setIsHover(pre=>!pre)}
            borderRadius="100px"
            aspectRatio={isHover ? "unser" : "1 / 1"}
        >
            <Icon as={IconComponent} stroke="icon.pink" color="pink" />
            {/* <Icon stroke="green" /> */}
            {isHover ? <Text color="content.secondary" letterSpacing="1.5px">{label}</Text> : null}
        </Button>
    )
};

export default NavigationButton;
