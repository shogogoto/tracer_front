import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useCounter } from './counter';

describe('useCounterのテスト', () => {
  const { result } = renderHook(() => useCounter())

  test('increment関数を実行すると、countが1増える', () => {

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })
});
