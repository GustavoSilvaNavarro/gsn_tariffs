import { Component, type ReactNode, type ErrorInfo } from 'react';
import type { Nullable } from '@/interfaces';
import { Button, Box } from '@mui/material';
import alertBackground from '@/assets/alert-background.png';
import logger from '@/adapters/logger';
import { ENVIRONMENT } from '@/config';

type ErrorBoundaryProps = {
  children?: ReactNode;
  fallback?: (error: Error, errorInfo: ErrorInfo) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  err: Nullable<Error>;
  errorInfo: Nullable<ErrorInfo>;
};

class PageErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false, err: null, errorInfo: null };

  // NOTE: static lifecycle method that updates the component's state when a descendant component throws an error
  // signaling to render a fallback UI
  public static getDerivedStateFromError(err: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, err, errorInfo: null }; // errorInfo will be set in componentDidCatch
  }

  // It's primarily used for logging error information.
  public componentDidCatch(err: Error, errorInfo: ErrorInfo): void {
    logger.error('Uncaught error in ErrorBoundary:', err, errorInfo);
    this.setState({ errorInfo });
  }

  public render(): ReactNode {
    const refreshPage = () => {
      window.location.reload();
    };

    if (this.state.hasError) {
      // If a custom fallback component is provided, render it
      if (this.props.fallback) {
        if (this.state.err && this.state.errorInfo) return this.props.fallback(this.state.err, this.state.errorInfo);

        return this.props.fallback(new Error('Unknown error'), { componentStack: 'Unknown component stack' });
      }

      return (
        <div className="flex-[0.8_1_0%] flex items-center justify-center flex-col h-screen w-full text-center text-black">
          <img src={alertBackground} alt="Error background" className="mb-[60px] max-w-[100%]" />
          <h2 className="m-0 text-3xl">Oops, Something went wrong</h2>
          <Box my={1}>
            <Button variant="outlined" color="secondary" onClick={refreshPage}>
              Refresh Page
            </Button>
          </Box>
          <p className="text-[0.9rem] m-0">Contact Support if problem persist.</p>

          {ENVIRONMENT === 'local' && (
            <details className="mt-[10px] whitespace-pre-wrap overflow-scroll text-left">
              {this.state.err ? this.state.err.toString() : null}
              <br />
              {this.state.errorInfo ? this.state.errorInfo.componentStack : null}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
