import React from "react";
import { useNavigate } from "react-router-dom";

export function BackButton({styling}) {

    const navigate = useNavigate()

    return (
        <button
            type="button"
            onClick={() => navigate(-1)}
            className={`
                ${styling
                    ? styling
                    : ''
                }
                `}
        >
                Go Back
        </button>
    )
}