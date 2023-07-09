import React from 'react';
import { Button } from '@rneui/themed';

export default function PrimaryButton(props) {
    return (
        <Button
            {...props}
            buttonStyle={{
                backgroundColor: '#3883ff',
                width: 200,
                borderRadius: 10,
            }}
            containerStyle={{
                alignItems: 'center',
            }}
        />
    );
}
