import { Button, Icon, Text } from "@chakra-ui/react";
import React from "react";

const NavigationButton = ({
    icon: IconComponent,
    label,
    isSelected,
    onClick,
}) => {
    return (
        <Button
            flex="1 1 0"
            data-label={label}
            display="flex"
            flexDirection="column"
            bg="transparent"
            height="auto"
            color={isSelected ? "content.highlight" : "content.tertiary"}
            transform={isSelected ? 'scale(1.2)' : ''}
            onClick={() => {
                onClick(label)
            }}
        >
            <Icon width="1.75rem" height="1.75rem" as={IconComponent} />
            {/* <Text textStyle="lg" letterSpacing="1.5px">{label}</Text> */}
        </Button>
    )
};

export default NavigationButton;
